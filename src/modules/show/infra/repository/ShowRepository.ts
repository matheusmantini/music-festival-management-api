import { Show } from "../../domain/entities/Show";
import { client } from "../../../../shared/helpers/PrismaClient";
import { showType } from "../../domain/entities/showType";

class ShowRepository {
  public create = async (show: Show) => {
    try {
      const newShow = {
        week_day: show.getWeekDay(),
        start_time: show.getStartTime(),
        end_time: show.getEndTime(),
        band_id: show.getBandId(),
      };
      return await client.shows.create({ data: newShow });
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };

  public getShowById = async (id: string) => {
    try {
      const show = await client.shows.findFirst({
        where: { id },
      });

      if (!show) {
        return [];
      }

      return show;
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };

  public getShowsBySchedule = async (weekDay: string) => {
    try {
      const shows = await client.shows.findMany({
        where: { week_day: weekDay },
      });

      if (!shows) {
        return [];
      }

      return (
        shows &&
        shows.map((show) => {
          return Show.toShowModel(show);
        })
      );
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };

  public getShowsByDate = async (weekDay: string): Promise<showType[] | null> => {
    try {
      const shows = await client.shows.findMany({
        where: { week_day: weekDay },
      });

      if (!shows) {
        return [];
      }

      const showsBySchedule = shows.map((show) => {
        return {
          id: show.id,
          band_id: show.band_id,
          start_time: show.start_time,
          end_time: show.end_time,
          week_day: show.week_day,
        };
      });

      return showsBySchedule;
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };
}

export { ShowRepository };
