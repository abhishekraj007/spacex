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
          <img src={mission_patch_small || placeholderImg} alt={mission_name} />
        </figure>

        {/* Mission name  */}
        <h2 className="program-name">{mission_name}</h2>

        {/* Mission Ids  */}
        {mission_id.length > 0 ? (
          <p>
            <strong>Mission Ids: </strong>
            <ul>
              {mission_id.map((id) => {
                return <li key={id}>{id}</li>;
              })}
            </ul>
          </p>
        ) : null}

        {/* Launch Year  */}
        <p>
          <strong>Lanuch Year: </strong> {launch_year}
        </p>
        {/* Launch Success  */}
        <p>
          <strong>Successful Launch: </strong> <span>{launch_success}</span>
        </p>
        {/* Launch Success  */}
        <p>
          <strong>Successful Landing: </strong> {land_success}
        </p>
      </div>
    </li>
  );
};

export default Program;
