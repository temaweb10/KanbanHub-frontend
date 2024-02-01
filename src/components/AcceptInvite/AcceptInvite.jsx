import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../axios";
function AcceptInvite() {
  const params = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .post("/project/acceptInviteLink", {
        token: params.token,
      })
      .then((res) => {
        navigate(`/dashboard/${res.data.idProject}`);
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data.message);
        setTimeout(() => {
          navigate(`/`);
        }, 1000);
      });
  }, []);
  return <div></div>;
}

export default AcceptInvite;
