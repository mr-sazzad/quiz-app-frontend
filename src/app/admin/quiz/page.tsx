import Footer from "@/components/footer/Footer";
import React from "react";

const page = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row gap-5">
        <p className="p-3 border border-gray-400 rounded text-gray-800">
          As an admin, log in to see user rankings in the
          &quot;Leaderboard&quot; and customize your profile in the
          &quot;Profile&quot; section. Save any changes you make. When dealing
          with questions in the &quot;Questions&quot; section, remember you can
          provide more than five options. When creating a new question, type in
          the question and give multiple choices. In the &quot;Correct
          Answer&quot; part, use numbers starting from 0 to indicate the right
          answer. Save the question when you&apos;re finished. If updating a
          question, follow the same process.
        </p>
        <p className="p-3 border border-gray-400 rounded text-gray-800">
          Log in to the admin dashboard. In the &quot;Questions&quot; or
          &quot;Quiz Management&quot; section: To add a new question, find and
          click &quot;Add New Question.&quot;` Fill in the details and save. To
          update a question, locate it, edit as needed, and save the changes.
        </p>
      </div>
      <Footer />
    </>
  );
};

export default page;
