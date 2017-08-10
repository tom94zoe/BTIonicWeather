/**
 * Created by thzo on 10.08.17.
 */
import {DateTime} from 'ionic-angular';
export class PercipitateFilter{

  public dualPercipitateValue:RangeDualKnobs = null;
  public dayTime : DayTime = DayTime.None;
  public fromDate:DateTime = null;
  public toDate:DateTime = null;
  public dualPercipitateValueActive:boolean = false; 
}

export class RangeDualKnobs{
  public lower:number;
  public upper:number;
}

export enum DayTime{
  Day,
  Night,
  None
}
