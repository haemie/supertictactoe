export default function LoadingAnimation() {
  return (
    <div className="loadingBoard">
      {Array(9)
        .fill(0)
        .map((e, i) => (
          // <div key={i} style={{ animationDelay: `${i / 36}s` }} />
          <div key={i} />
        ))}
    </div>
  );
}
