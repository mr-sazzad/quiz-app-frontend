import MaxWidth from "@/components/MaxWidth";
import Quiz from "@/components/quiz/Quiz";
import Instruction from "@/components/user/UserIns";
import Footer from "./../components/footer/Footer";

export default function Home() {
  return (
    <div>
      <MaxWidth>
        <Quiz />
        <Instruction />
        <Footer />
      </MaxWidth>
    </div>
  );
}
