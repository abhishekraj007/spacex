const ListItem = (props) => {
  const {
    mission_name,
    flight_number,
    links: { mission_patch_small, reddit_launch: article_link },
    mission_id,
    launch_year,
    launch_success,
    land_success,
    launch_landing,
  } = props;

  const placeholderImg = "/placeholder.jpg";

  return (
    <li className="program-item">
      <div className="card">
        {/* Thumbnail */}
        <a href={article_link} target="_blank" rel="noopener">
          <figure className="program-image">
            <img
              src={mission_patch_small || placeholderImg}
              alt={mission_name}
            />
          </figure>
        </a>

        {/* Mission name  */}

        <a href={article_link} target="_blank" rel="noopener">
          <h2 className="program-name">
            {mission_name} #{flight_number}
          </h2>
        </a>

        {/* Mission Ids  */}
        {mission_id.length > 0 ? (
          <div>
            <p>
              <strong>Mission Ids: </strong>
            </p>
            <ul>
              {mission_id.map((id) => {
                return (
                  <li key={id}>
                    <p>{id}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : null}

        {/* Launch Year  */}
        <p>
          <strong>Lanuch Year: </strong> {launch_year}
        </p>
        {/* Launch Success  */}
        <p>
          <strong>Successful Launch: </strong>{" "}
          <span>{launch_success ? "Yes" : "No"}</span>
        </p>
        {/* Launch Success  */}
        <p>
          <strong>Successful Landing: </strong>{" "}
          {launch_landing === undefined
            ? "N/A"
            : launch_landing
            ? "Yes"
            : "false"}
        </p>
      </div>
    </li>
  );
};

export default ListItem;
