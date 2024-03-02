import { Dispatch, SetStateAction } from "react";
import { MarkdownState } from "../../core/components/Main";

export type markdownParserProps = {
  token: string
  mdState: MarkdownState
  setMdSate: Dispatch<SetStateAction<MarkdownState>>
}