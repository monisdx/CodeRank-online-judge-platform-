import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <article className="flex h-screen items-center justify-center">
      <div className="relative flex w-[30vw] flex-col items-center gap-y-2 rounded-2xl border border-front border-opacity-20 bg-background p-6 shadow-lg mobile:w-max">
        <div
          className="absolute-cover -z-10 scale-90 animate-pulse bg-primary blur-3xl"
          style={{ animationDelay: "1s" }}
        />
        <div className="absolute-cover -z-1 scale-90 animate-pulse bg-secondary blur-3xl" />
        <h1 className="text-7xl font-semibold text-primary">404</h1>
        <h2 className="font-lato text-3xl font-black text-front">
          Page Not Found
        </h2>
        <p className="my-3 text-center text-sm text-front text-opacity-70">
          We were not able to find the page you were looking for
        </p>
        <Link to="/" className="btn-1">
          Back to Homepage
        </Link>
      </div>
    </article>
  );
}
