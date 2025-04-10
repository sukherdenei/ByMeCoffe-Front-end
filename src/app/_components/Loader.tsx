import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export const Loader = () => {
  return (
    <div>
      <DotLottieReact
        src="/Animation.json"
        loop
        autoplay
        style={{ width: 200, height: 200 }}
      />
    </div>
  );
};
