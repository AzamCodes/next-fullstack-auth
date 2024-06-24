export default function UserProfilePage({ params }: any) {
  return (
    <>
      <div className="flex flex-col gap-6 items-center pt-24">
        <h1 className="text-2xl text-green-400 font-semibold ">Profile</h1>
        <p className="text-lg ">
          Profile Id <span className="text-green-300">{params.id}</span>
        </p>
      </div>
    </>
  );
}
