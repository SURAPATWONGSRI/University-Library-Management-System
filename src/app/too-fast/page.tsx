const page = () => {
  return (
    <main className="flex min-h-screen flex-1 flex-col px-5 xs:px-10 md:px-16 justify-center items-center ">
      <h1 className="text-5xl font-bold text-base-100">
        Whoa, Slow Down There, Speedy!
      </h1>
      <p className="mt-3 text-center max-w-xl text-muted-foreground">
        Looks like you&apos;ve been a little too eager. We&apos;ve put a
        temporary pause on your excitement. 🚦 Chill for a bit, and try again.
      </p>
    </main>
  );
};

export default page;
