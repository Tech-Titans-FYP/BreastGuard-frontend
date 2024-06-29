import React from "react";
import { Card, CardContent, Typography, Avatar, Grid } from "@mui/material";
import { colors } from "../../consts/Colors";
import team from "../../assets/team/malshi.jpg";
import lochandaka from "../../assets/team/lochandaka.jpg";
import sumudu from "../../assets/team/sumudu.jpg";
import mifras from "../../assets/team/mifras.jpg";

const teamMembers = [
  {
    name: "Mifras Gaffoor",
    email: "mifrasagm.19@uom.lk",
    image: mifras,
  },
  {
    name: "Malshi Kulasinghe",
    email: "kulasingheams.19@uom.lk",
    image: team,
  },
  {
    name: "Sandamini Kumarasinghe",
    email: "kumarasinghejasn.19@uom.lk",
    image: team,
  },
  {
    name: "Sachini Kumarathunga",
    email: "kumarathungadgbs.19@uom.lk",
    image: team,
  },
];
const TeamMemberCard = ({ name, title, email, avatarSrc, xs, sm, md }) => {
  return (
    <Grid item xs={xs} sm={sm} md={md}>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          m: 2,
          backgroundColor: "transparent", // Set the background color to transparent
          boxShadow: "none", // Optionally remove the box shadow to make it look flat
        }}
      >
        <Avatar
          alt={name}
          src={avatarSrc}
          sx={{ width: 150, height: 150, mt: 2 }}
        />
        <CardContent
          sx={{
            textAlign: "center",
          }}
        >
          <Typography gutterBottom variant="h6">
            {name}
          </Typography>
          <Typography variant="body2" color="text.primary">
            {email}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

const Team = () => {
  return (
    <Grid
      container
      justifyContent="center"
      sx={{
        background: "#F5F5F5",
        p: 2,
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: "bold",
          textAlign: "center",
          mb: 4,
          color: colors.darkNavy,
        }}
      >
        Our Team
      </Typography>
      {/* First Row */}
      <Grid item xs={12} container justifyContent="space-around">
        <TeamMemberCard
          name="Dr. Lochandaka Ranathunga"
          email=""
          avatarSrc={lochandaka}
          xs={12}
          sm={6}
          md={6}
        />
        <TeamMemberCard
          name="Mrs. W.A.S.N. Wijethunge"
          email=""
          avatarSrc={sumudu}
          xs={12}
          sm={6}
          md={6}
        />
      </Grid>

      {/* Second Row */}
      <Grid item xs={12} container justifyContent="space-around">
        {teamMembers.map((member, i) => (
          <TeamMemberCard
            key={i}
            name={member.name}
            email={member.email}
            avatarSrc={member.image}
            xs={12}
            sm={6}
            md={3}
          />
        ))}
      </Grid>
    </Grid>
  );
};

export default Team;
