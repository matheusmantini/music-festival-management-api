import { Router } from 'express';

import { authRoutes } from '../../modules/auth/infra/http/routes/AuthRouter';
import { bandRoutes } from '../../modules/band/infra/http/routes/BandRouter';
import { photoRoutes } from '../../modules/photo/infra/http/routes/PhotoRouter';
import { showRoutes } from '../../modules/show/infra/http/routes/ShowRouter';
import { ticketRoutes } from '../../modules/ticket/infra/http/routes/TicketRouter';
import { userRoutes } from '../../modules/user/infra/http/routes/UserRouter';

const AllRoutes = Router();

AllRoutes.use('/auth', authRoutes);

AllRoutes.use('/band', bandRoutes);
AllRoutes.use('/photo', photoRoutes);
AllRoutes.use('/show', showRoutes);
AllRoutes.use('/ticket', ticketRoutes);
AllRoutes.use('/user', userRoutes);

export default AllRoutes;
