export async function POST(req: Request) {
  const body = await req.json();
  console.log(body)
  const {
    firstName,
    lastName,
    dateOfBirth,
    roomNumber,
    gender,
    unitId,
    teamLeadId,
    gp,
    nextOfKin,
    photo,
  } = body.values
  console.log(firstName,lastName,dateOfBirth,roomNumber,gender,unitId,teamLeadId,gender,nextOfKin,gp,photo);
}
