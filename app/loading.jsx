import { ClipLoader } from 'react-spinners';

const override = {
  borderColor: 'borderPrimary',
};

export default function loading() {
  return (
    <div className="h-screen flex justify-center mt-24">
      <ClipLoader
        color="buttonCta"
        cssOverride={override}
        size={30}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}
