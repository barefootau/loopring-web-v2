import { Box, Typography } from "@mui/material";
import { TOAST_TIME } from "@loopring-web/common-resources";
import {
  CollectionCardList,
  Toast,
  useSettings,
} from "@loopring-web/component-lib";
import { useAccount, useMyNFTCollection } from "@loopring-web/core";
import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { WithTranslation, withTranslation } from "react-i18next";
import styled from "@emotion/styled";

const _StyledPaper = styled(Box)`
  background: var(--color-box);
  border-radius: ${({ theme }) => theme.unit}px;
`;
export const MyNFTCollectionList = withTranslation("common")(
  ({ t }: WithTranslation) => {
    const history = useHistory();
    const { search } = useLocation();
    const searchParams = new URLSearchParams(search);
    const { account } = useAccount();
    const { isMobile } = useSettings();
    const { copyToastOpen, ...collectionListProps } = useMyNFTCollection();
    return (
      <Box
        flex={1}
        marginTop={0}
        paddingX={2}
        marginBottom={2}
        display={"flex"}
        flexDirection={"column"}
      >
        <Typography variant={"body1"} marginY={2} color={"textSecondary"}>
          {t("labelMyCollectionsDes")}
        </Typography>
        <CollectionCardList
          noEdit={true}
          account={account}
          size={isMobile ? "small" : "large"}
          onItemClick={(item) => {
            searchParams.set("myNFTPage", "1");
            history.push({
              pathname: `/NFT/assetsNFT/byCollection/${item.contractAddress}--${item.id}`,
              search: searchParams.toString(),
            });
          }}
          {...{ ...(collectionListProps as any) }}
        />
        <Toast
          alertText={
            copyToastOpen?.type === "json"
              ? t("labelCopyMetaClip")
              : copyToastOpen.type === "url"
              ? t("labelCopyUrlClip")
              : t("labelCopyAddClip")
          }
          open={copyToastOpen?.isShow}
          autoHideDuration={TOAST_TIME}
          onClose={() => {
            collectionListProps.setCopyToastOpen({ isShow: false, type: "" });
          }}
          severity={"success"}
        />
      </Box>
    );
  }
);
