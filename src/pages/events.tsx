import Navbar from "~/components/Navbar";

export default function Events() {
  return (
    <div>
      <Navbar />
      <div className="p-5">
        <h1 className="text-center text-3xl font-bold">Events</h1>
        <p>No upcoming events at this time.</p>
      </div>
    </div>
  );
}
