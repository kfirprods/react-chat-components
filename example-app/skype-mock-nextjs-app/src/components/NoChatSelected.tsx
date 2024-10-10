export default function NoChatSelected() {
  return (
    <div className="w-full h-full flex flex-col place-content-center p-6 gap-2">
      <h1 className="text-2xl text-center font-bold m-4">
        Welcome to <strong className="text-sky-400">Zkype</strong>!
      </h1>
      <p>
        This is just an example app that demonstrates the react-chat-components
        library.
      </p>
      <p>
        It's a <strong>mock-up</strong> of Skype's interface, so some interface
        elements don't do anything.
      </p>

      <p className="italic">Written using NextJS + TypeScript + TailwindCSS.</p>
    </div>
  );
}
