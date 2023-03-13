import Profile from "../commons/Profile";

// este componente es una grilla de los usuarios
const User = ({ users }) => {

  return (
    <div className="flex flex-wrap justify-center">
      {users.map((user, i) => (
        <div className="m-6 p-4 w-1/4 shadow-black shadow-big-around bg-neutral-700" key={i}>
          <Profile user={user} />
        </div>
      ))}
    </div>
  );
};

export default User;
