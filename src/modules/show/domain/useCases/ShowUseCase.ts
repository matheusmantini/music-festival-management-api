import {
  BadRequestError,
  ConflictError,
  NotFoundError,
} from "../../../../shared/errors";
import { Show } from "../entities/Show";
import { WEEK_DAY } from "../entities/WeekDay";
import { BandRepository } from "../../../band/infra/repository/BandRepository";
import { ShowRepository } from "../../infra/repository/ShowRepository";
import { ShowInputDTO } from "../dto/showInput.dto";

class ShowUseCase {
  constructor(
    private showRepository: ShowRepository,
    private bandRepository: BandRepository
  ) {}

  weekDays = Object.values(WEEK_DAY);

  public create = async (newShow: ShowInputDTO) => {
    const { bandId, weekDay, startTime, endTime } = newShow;

    if (!this.weekDays.includes(weekDay.toUpperCase())) {
      throw new BadRequestError(
        `Invalid week day. Week day must be: ${this.weekDays.join(" OR ")}`
      );
    }

    if (!bandId) {
      throw new BadRequestError("Invalid entry. 'BandId' is required");
    }

    if (!weekDay || !startTime || !endTime) {
      throw new BadRequestError(
        "Invalid entries. The 'weekDay', 'startTime' and 'endTime' fields are required."
      );
    }

    const bandAlreadyExists = await this.bandRepository.getBandByNameOrId(
      bandId
    );

    if (!bandAlreadyExists) {
      throw new NotFoundError("Band not found, make sure id is correct.");
    }

    if (+startTime < 8 || +startTime >= 23) {
      throw new BadRequestError("Showtime must be between 8h and 23h");
    }

    if (!Number.isInteger(+startTime) || !Number.isInteger(+endTime)) {
      throw new BadRequestError("Showtime cannot be float");
    }

    const showsBySchedule = await this.showRepository.getShowsBySchedule(
      weekDay.toUpperCase()
    );

    if (!showsBySchedule) {
      return [];
    }

    for (let show of showsBySchedule) {
      if (
        show.getStartTime() === +startTime ||
        (show.getStartTime() < +startTime && show.getEndTime() > +startTime) ||
        (show.getStartTime() < +endTime && show.getEndTime() > +endTime)
      ) {
        throw new ConflictError(
          "There is already a show scheduled for that day and time"
        );
      }
    }

    const show = new Show(
      weekDay.toUpperCase(),
      Number(startTime),
      Number(endTime),
      bandId
    );

    await this.showRepository.create(show);
  };

  public getShowsByDate = async (weekDay: string) => {
    if (!weekDay) {
      throw new BadRequestError(
        "Invalid entries. The 'weekDay' field is required."
      );
    }
    if (!this.weekDays.includes(weekDay.toUpperCase())) {
      throw new BadRequestError(
        `Invalid week day. Week day must be: ${this.weekDays.join(" OR ")}`
      );
    }

    const showsByDate = await this.showRepository.getShowsByDate(
      weekDay.toUpperCase()
    );

    if (!showsByDate) {
      return [];
    }

    let showsWithBandDetails = [];
    for (const show of showsByDate) {
      const band = await this.bandRepository.getBandByNameOrId(show.band_id);
      showsWithBandDetails.push({
        id: show.id,
        name: band?.name,
        genre: band?.music_genre,
        start_time: show.start_time,
        end_time: show.end_time,
      });
    }

    return showsWithBandDetails.sort((a, b) => a.start_time - b.start_time);
  };
}

export { ShowUseCase };
