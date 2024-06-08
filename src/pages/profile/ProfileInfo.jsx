import { useSelector } from "react-redux";

const ProfileInfo = () => {
  const { userInfo } = useSelector((state) => state.customerAuth);

  return (
    <div className="bg-white rounded-md w-full h-full min-h-[50vh]">
      <div className="p-6">
        <h2 className="font-semibold text-xl mb-6">User Information</h2>
        <div className="flex flex-col justify-between items-start gap-2">
          <div className="flex flex-row justify-start items-center gap-3">
            <h2 className="font-semibold">First Name:</h2>
            <h2>{userInfo?.firstName}</h2>
          </div>
          <div className="flex flex-row justify-start items-center gap-3">
            <h2 className="font-semibold">Last Name:</h2>
            <h2>{userInfo?.lastName}</h2>
          </div>
          <div className="flex flex-row justify-start items-center gap-3">
            <h2 className="font-semibold">Email:</h2>
            <h2>{userInfo?.email}</h2>
          </div>
          <div className="flex flex-row justify-start items-center gap-3">
            <h2 className="font-semibold">Role:</h2>
            <h2>{userInfo?.role}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
