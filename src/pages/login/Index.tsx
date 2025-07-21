import Button from "../../components/ui/Button";

export default function LogIn() {
  return (
    <div className="container px-4 mx-auto">
      <div className="max-w-lg mx-auto mt-10">
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-bold">Log in</h2>
        </div>
        <form action="">
          <div className="mb-6">
            <label className="block mb-2 font-bold">Email</label>
            <input
              className="inline-block w-full p-4 leading-6 text-lg font-extrabold placeholder-purple-800 bg-white shadow border-2 border-purple-800 rounded"
              type="email"
              placeholder="Email"
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 font-bold">Password</label>
            <input
              className="inline-block w-full p-4 leading-6 text-lg font-extrabold placeholder-purple-800 bg-white shadow border-2 border-purple-800 rounded"
              type="password"
              placeholder="**********"
            />
          </div>
          <Button type="login">Sign in</Button>
          <p className="text-center font-bold mt-2">Don't have an account?</p>
        </form>
      </div>
    </div>
  );
}
