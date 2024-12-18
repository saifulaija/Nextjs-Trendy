
import { USER_ROLE } from '../modules/User/user.constant';
import { User } from '../modules/User/user.model';

const superUser = {
  name:"Md.Mamun Hariz",
  phone:"+8801717722085",

  role: USER_ROLE.superAdmin,

  isDeleted: false,
};

const seedSuperAdmin = async () => {
  //when database is connected, we will check is there any user who is super admin
  const isSuperAdminExits = await User.findOne({ role: USER_ROLE.superAdmin });

  if (!isSuperAdminExits) {
    await User.create(superUser);
  }
};

export default seedSuperAdmin;
