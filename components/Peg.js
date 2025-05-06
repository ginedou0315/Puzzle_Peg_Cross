function Peg({
  filled,
  selected,
  validMove,
  onClick,
  position,
  isHammerTarget,
}) {
  try {
    const pegClasses = `peg ${filled ? "filled" : "empty"} ${
      selected ? "selected" : ""
    } ${validMove ? "valid-move" : ""} ${
      isHammerTarget ? "hammer-target" : ""
    }`;

    return (
      <div
        data-name="peg"
        className={pegClasses}
        onClick={() => onClick(position)}
        role="button"
        aria-label={`Peg at position ${position}`}
        data-valid-move={validMove}
      />
    );
  } catch (error) {
    console.error("Peg component error:", error);
    reportError(error);
    return null;
  }
}
