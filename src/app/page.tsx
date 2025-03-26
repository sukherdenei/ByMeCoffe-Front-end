import Loading from "./api/user/loading";
import { Header } from "./_components/Header.";

export default function Home() {
  return (
    <div>
      <Header />
      <div className="flex flex-col items-center justify-center w-screen h-screen">
        <Loading />
        <h1>Loading</h1>
      </div>
    </div>
  );
}
