/**
 * Render a div the same size as the outer board with a simple css loading animation
 * @returns
 */
export default function LoadingAnimation() {
  return (
    <div className="loadingBoard">
      {Array(9)
        .fill(0)
        .map((_, i) => (
          // <div key={i} style={{ animationDelay: `${i / 36}s` }} />
          <div key={i} />
        ))}
    </div>
  );
}
