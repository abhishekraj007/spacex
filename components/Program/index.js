const Program = (props) => {
  const {
    mission_name,
    links: { mission_patch_small },
    mission_id,
    launch_year,
    launch_success,
    land_success,
  } = props;
  const placeholderImg = "/placeholder.jpg";

  return (
    <li className="program-item">
      <div className="card">
        {/* Thumbnail */}
        <figure className="program-image">
          <img src={mission_patch_small || placeholderImg} alt="" />
        </figure>

        {/* Mission name  */}
        {mission_name}

        {/* Mission Ids  */}
        {mission_id.length > 0 ? (
          <>
            <div>Mission Ids: </div>
            <ul>
              {mission_id.map((id) => {
                return <li key={id}>{id}</li>;
              })}
            </ul>
          </>
        ) : null}

        {/* Launch Year  */}
        <div>
          <strong>Lanuch Year: </strong> {launch_year}
        </div>
        {/* Launch Success  */}
        <div>
          <strong>Successful Launch: </strong> <span>{launch_success}</span>
        </div>
        {/* Launch Success  */}
        <div>
          <strong>Successful Landing: </strong> {land_success}
        </div>
      </div>
    </li>
  );
};

export default Program;
