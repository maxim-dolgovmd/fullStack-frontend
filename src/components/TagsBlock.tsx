import React from "react";
import { Link } from "react-router-dom";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import TagIcon from "@mui/icons-material/Tag";
import ListItemText from "@mui/material/ListItemText";
import Skeleton from "@mui/material/Skeleton";

import { SideBlock } from "./SideBlock";

type TagsType = {
  items: string[],
  isLoading: boolean
}

export const TagsBlock: React.FC<TagsType> = ({ items, isLoading }) => {
  console.log(items)
  return (
    <SideBlock title="Тэги">
      <List>
        {(isLoading ? [...Array(5)] : items)
          .filter((tag) => tag !== '')
          .map((name, i) => (
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to={`/tags/${name}`}
          >
            <ListItem key={i} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <TagIcon />
                </ListItemIcon>
                {isLoading ? (
                  <Skeleton width={100} />
                ) : (
                  <ListItemText primary={name} />
                )}
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </SideBlock>
  );
};
