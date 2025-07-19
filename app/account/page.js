import { auth } from "../_lib/auth";

export const metadata = {
  title: "Guest area",
};
export default async function page() {
  const session = await auth();

  const firstName = session.user.name.split(" ").at(0);
  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-2 flex items-center gap-2">
        👋 Welcome, {firstName}
      </h2>
      <p className="text-primary-300 mb-1">
        Today is{" "}
        {new Date().toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
        })}
        .
      </p>
      <p className="text-primary-300 italic">
        Hope you are having a great day!
      </p>
    </div>
  );
}
