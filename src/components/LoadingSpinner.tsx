import { DotLoader } from "react-spinners";

export default function LoadingSpinner({ loading }: { loading?: boolean }) {
  return (
    <div className="fixed inset-0 top-0 flex justify-center items-center  z-[1000]">
      <DotLoader
        size={60}
        color="lime"
        loading={loading || true}
        className="opacity-80"
        speedMultiplier={1.5}
      />
    </div>
  );
}
