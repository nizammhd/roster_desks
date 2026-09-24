import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { useSearchParams } from "react-router-dom";
import { useState } from "react";

import {
  apiGetRoster,
  apiGetWards,
  apiPublish,
  staff,
} from "../../../../core/mocks/fakeApi";

import { isoWeekDates } from "../../../../core/time/hospitalTime";

import { validateRoster } from "../../../roster/domain/rules/rules";

export function PublishPage() {
  const [searchParams] = useSearchParams();

  const ward = searchParams.get("ward") || "ICU";
  const week = searchParams.get("week") || "2026-W39";

  const queryClient = useQueryClient();

  const [warnings, setWarnings] = useState<Set<string>>(
    new Set(),
  );

  // Get wards
  const { data: wards = [] } = useQuery({
    queryKey: ["wards"],
    queryFn: apiGetWards,
  });

  // Get roster
  const { data: roster } = useQuery({
    queryKey: ["roster", ward, week],
    queryFn: () => apiGetRoster(ward, week),
  });

  // Find current ward
  const currentWard = wards.find(
    (item) => item.code === ward,
  );

  // Loading state
  if (!roster || !currentWard) {
    return <p>Loading...</p>;
  }

  // Calculate violations
  const violations = validateRoster(
    roster.cells,
    staff,
    currentWard,
    isoWeekDates(week),
  );

  // Separate errors and warnings
  const errors = violations.filter(
    (violation) => violation.severity === "ERROR",
  );

  const warningViolations = violations.filter(
    (violation) => violation.severity === "WARNING",
  );

  // Publish mutation
  const publishMutation = useMutation({
    mutationFn: () => apiPublish(ward, week),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["roster", ward, week],
      });
    },
  });

  const toggleWarning = (key: string) => {
    setWarnings((previous) => {
      const next = new Set(previous);

      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }

      return next;
    });
  };

  const allWarningsAcknowledged =
    warnings.size === warningViolations.length;

  const canPublish =
    !roster.published &&
    errors.length === 0 &&
    allWarningsAcknowledged &&
    !publishMutation.isPending;

  return (
    <section>
      <h1>Publish Week</h1>

      <p>
        {errors.length} errors,{" "}
        {warningViolations.length} warnings
      </p>

      <div>
        {violations.map((violation, index) => {
          const key = `${violation.rule}-${index}`;

          const isError =
            violation.severity === "ERROR";

          return (
            <label
              key={key}
              className={violation.severity.toLowerCase()}
            >
              <input
                type="checkbox"
                disabled={isError}
                checked={warnings.has(key)}
                onChange={() => toggleWarning(key)}
              />

              <strong>
                {violation.severity}
              </strong>

              {" - "}

              {violation.message}
            </label>
          );
        })}
      </div>

      {roster.published && (
        <p>
          This week has already been published and is
          read-only.
        </p>
      )}

      {publishMutation.isError && (
        <p>
          Failed to publish the roster. Please try again.
        </p>
      )}

      {publishMutation.isSuccess && (
        <p>
          Roster published successfully.
        </p>
      )}

      <button
        disabled={!canPublish}
        onClick={() => publishMutation.mutate()}
      >
        {publishMutation.isPending
          ? "Publishing..."
          : roster.published
            ? "Published"
            : "Publish Week"}
      </button>
    </section>
  );
}