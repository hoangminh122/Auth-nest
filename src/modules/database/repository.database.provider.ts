import { Board } from "src/entities/Board";
import { Card } from "src/entities/Card";
import { Checklist } from "src/entities/Checklist";
import { Files } from "src/entities/File";
import { Label } from "src/entities/Label";
import { List } from "src/entities/List";
import { MemberBoard } from "src/entities/MemberBoard";
import { MemberCard } from "src/entities/MemberCard";
import { User } from "src/entities/User";
import { Item } from './../../entities/Item';

export const userRepository = {
    provide:'UserRepository',
    useValue:User
}

export const boardRepository = {
    provide:'BoardRepository',
    useValue:Board
}

export const listRepository = {
    provide:'ListRepository',
    useValue:List
}

export const cardRepository = {
    provide:'CardRepository',
    useValue:Card
}

export const labelRepository = {
    provide:'LabelRepository',
    useValue:Label
}

export const itemRepository = {
    provide:'ItemRepository',
    useValue:Item
}

export const checklistRepository = {
    provide:'ChecklistRepository',
    useValue:Checklist
}

export const memberBoardRepository = {
    provide:'MemberBoardRepository',
    useValue:MemberBoard
}

export const memberCardRepository = {
    provide:'MemberCardRepository',
    useValue:MemberCard
}

export const filesRepository = {
    provide:'FilesRepository',
    useValue:Files
}




