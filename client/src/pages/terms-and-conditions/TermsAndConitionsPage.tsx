import { TERMS_AND_CONDITIONS } from "./TermsText";

export const TermsAndConditionsPage = () => {
  return (
    <div className="flex flex-col items-center mb-10">
      <div className="title text-2xl font-semibold my-6">
        УМОВИ КОРИСТУВАННЯ
      </div>
      {TERMS_AND_CONDITIONS.map((term, index) => (
        <div className="text-justify font-medium sm:w-5/6 md:w-4/6 max-w-3xl mb-6">
          {index + 1}. {term}
        </div>
      ))}
    </div>
  );
};