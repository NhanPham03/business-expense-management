export default function Logo() {
  return (
    <div className="flex h-full justify-center items-center transition-all">
      <img className="h-[80%] dark:hidden block" src="/images/Logo_Light.png" alt="AccuRate Lightmode" />
      <img className="h-[80%] dark:block hidden" src="/images/Logo_Dark.png" alt="AccuRate Darkmode" />
    </div>
  );
}
