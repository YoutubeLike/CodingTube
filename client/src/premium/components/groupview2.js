export default function GroupView({ title, backgroundImage, description }) {
  return (
    <div className="section-group flex w-full justify-center py-5">
      <div className="section-group-backgroundImage w-1/3 flex justify-center ">
        <img
          className=""
          src={backgroundImage}
          style={{ backgroundSize: 'cover' }}
          alt=""
        />
      </div>
      <div className="section-group-description w-1/3 flex justify-center flex-col  ">
        <h1 className="text-4xl text-left ">{title}</h1>
        <p>{description}</p>
      </div>
    </div>
  );
}
