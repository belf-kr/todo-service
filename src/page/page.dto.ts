import { IsInt, IsNotEmpty, IsString } from "class-validator";

import { PageType } from "./page.type";

export class PageDto implements PageType {
  @IsInt({ groups: ["generated"] })
  id: number;

  @IsString({ always: true, message: "title 값이 문자열이 아닙니다." })
  @IsNotEmpty({ always: true, message: "title 값이 비어있습니다." })
  title: string;

  @IsString({ always: true, message: "content 값이 문자열이 아닙니다." })
  @IsNotEmpty({ always: true, message: "content 값이 비어있습니다." })
  content: string;
}
