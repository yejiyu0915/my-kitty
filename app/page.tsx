// import Image from 'next/image';
import { dummyPatientData } from './data/dummy';
import { PatientCard } from './components/patient/PatientCard';

export default function Home() {
  return (
    <div className="grid h-full w-full grid-cols-[1fr_350px] items-start justify-between gap-4">
      <div className="bg-cat border-primary flex h-full w-full flex-col items-center gap-6 rounded-lg border-2 bg-white p-8 pt-12"></div>
      <PatientCard patientData={dummyPatientData} />
    </div>
  );
}
