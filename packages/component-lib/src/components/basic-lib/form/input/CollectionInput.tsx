import {
  Box,
  BoxProps,
  Divider,
  Modal,
  Pagination,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  CollectionLimit,
  CopyIcon,
  copyToClipBoard,
  getShortAddr,
  Info2Icon,
  NFTLimit,
  CollectionMeta,
  MakeMeta,
  TOAST_TIME,
  myLog,
} from "@loopring-web/common-resources";
import {
  Button,
  CollectionCardList,
  CollectionListProps,
  DropdownIconStyled,
  SwitchPanelStyled,
  Toast,
} from "../../../index";
import React from "react";
import { Trans, useTranslation } from "react-i18next";
import styled from "@emotion/styled";

const SizeCss = {
  small: `
	  height: 2.4rem;
	  lineHeight: 2.4rem;
	`,
  large: `
	  height: 4.8rem;
	  lineHeight: 4.8rem;
	`,
  medium: `
	 height: 3.2rem;
	 lineHeight: 3.2rem;
	`,
};
const BoxStyle = styled(Box)<BoxProps & { size: "small" | "large" | "medium" }>`
  padding: 0.3rem 0.3rem 0.3rem 0.8rem;
  ${({ theme }) =>
    theme.border.defaultFrame({ c_key: "var(--color-border)", d_R: 0.5 })};

  &:hover,
  &:active {
    color: var(--color-text-primary);
    background: var(--color-box-hover);
    ${({ theme }) =>
      theme.border.defaultFrame({
        c_key: "var(--color-border-hover)",
        d_R: 0.5,
      })};
  }

  .selected {
    color: var(--color-text-button-select);
    background: var(--color-box);
    ${({ theme }) =>
      theme.border.defaultFrame({
        c_key: "var(--color-border-select)",
        d_R: 0.5,
      })};
  }

  ${({ size }) => SizeCss[size]}
` as (props: BoxProps & { size: "small" | "large" | "medium" }) => JSX.Element;

export type CollectionInputProps<Co> = {
  collection?: Co;
  collectionListProps: CollectionListProps<Co>;
  onSelected: (item: Co) => void;
  domain: string;
  makeMeta: MakeMeta;
};

export const CollectionInput = <Co extends CollectionMeta>({
  collection,
  collectionListProps,
  fullWidth = false,
  width = "content-fit",
  size = "medium",
  showCopy = false,
  onSelected,
  domain,
  makeMeta,
  isRequired = false,
}: CollectionInputProps<Co> & {
  showCopy?: boolean;
  fullWidth?: boolean;
  width?: any;
  size?: "small" | "large" | "medium";
  domain: string;
  makeMeta: MakeMeta;
  isRequired?: boolean;
}) => {
  const [_modalState, setModalState] = React.useState(false);
  // const [selectCollectionMeta, setSelectCollectionMeta] = React.useState(collection);
  const { t } = useTranslation("common");
  const [dropdownStatus, setDropdownStatus] =
    React.useState<"up" | "down">("down");
  const { onPageChange, total, page } = collectionListProps;
  myLog("collectionList", collectionListProps.collectionList);
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      width={fullWidth ? "100%" : width}
    >
      <Tooltip
        title={t("labelMintCollectionTooltips").toString()}
        placement={"top"}
      >
        <Box width={"100%"}>
          <Typography
            variant={"body1"}
            color={"textSecondary"}
            className={"main-label"}
            paddingBottom={1 / 2}
            display={"inline-flex"}
            height={24}
            lineHeight={24}
            alignItems={"center"}
          >
            <Trans
              i18nKey={"labelMintCollection"}
              tOptions={{ required: isRequired ? "\uFE61" : "" }}
            >
              Choose Collection
              <Typography
                component={"span"}
                variant={"inherit"}
                color={"error"}
              >
                {"\uFE61"}
              </Typography>
              <Info2Icon
                fontSize={"small"}
                color={"inherit"}
                sx={{ marginX: 1 / 2 }}
              />
            </Trans>
          </Typography>
        </Box>
      </Tooltip>
      <BoxStyle
        width={"100%"}
        display={"flex"}
        alignItems={"center"}
        fontSize={"1.6rem"}
        size={size}
        className={collection ? "selected" : ""}
        justifyContent={"space-between"}
        onClick={(_e: any) => {
          _e.stopPropagation();
          setDropdownStatus((prev) => (prev === "up" ? "down" : "up"));
          setModalState(true);
          onPageChange(1, { isMintable: true });
        }}
        style={{ cursor: "pointer", whiteSpace: "nowrap" }}
      >
        <Box
          flex={1}
          display={"flex"}
          flexDirection={size === "large" ? "column" : "row"}
          alignItems={size === "large" ? "stretch" : "center"}
        >
          {collection ? (
            <>
              <Typography
                component={"span"}
                variant={"body1"}
                color={"textPrimary"}
                textOverflow={"ellipsis"}
                overflow={"hidden"}
                display={"inline-flex"}
                whiteSpace={"pre"}
                sx={
                  size !== "large"
                    ? {
                        maxWidth: "160px",
                        wordBreak: "break-all",
                      }
                    : {}
                }
              >
                {collection.name}
              </Typography>
              <Typography
                component={"span"}
                marginLeft={size === "large" ? 0 : 1}
                variant={"body2"}
                color={"var(--color-text-third)"}
              >
                {size === "large"
                  ? collection.contractAddress
                  : " " + getShortAddr(collection.contractAddress ?? "", true)}
              </Typography>
            </>
          ) : (
            <></>
          )}
        </Box>
        <DropdownIconStyled status={dropdownStatus} fontSize={size} />
      </BoxStyle>
      {collection && showCopy && (
        <Button
          variant={"text"}
          color={"primary"}
          size={"small"}
          endIcon={<CopyIcon color={"secondary"} />}
          sx={{
            marginLeft: 0,
            paddingLeft: 0,
            justifyContent: "flex-start",
          }}
          onClick={(e) => {
            e.stopPropagation();
            if (collection) {
              const { metaDemo } = makeMeta({ collection, domain });
              copyToClipBoard(JSON.stringify(metaDemo));
              collectionListProps.setCopyToastOpen({
                isShow: true,
                type: "json",
              });
            }
          }}
        >
          {t("labelCopyNFTDemo")}
        </Button>
      )}
      <Modal
        open={_modalState}
        onClose={() => {
          setDropdownStatus((prev) => (prev === "up" ? "down" : "up"));
          setModalState(false);
        }}
      >
        <SwitchPanelStyled
          display={"flex"}
          overflow={"scroll"}
          alignItems={"stretch"}
          height={"80%"}
          width={"90%"}
          padding={2}
        >
          {total > CollectionLimit && (
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
              marginRight={3}
              marginBottom={2}
            >
              <Typography variant={"h5"}>
                {t("labelChooseCollection")}
              </Typography>

              <Pagination
                color={"primary"}
                count={
                  parseInt(String(total / NFTLimit)) +
                  (total % NFTLimit > 0 ? 1 : 0)
                }
                page={page}
                onChange={(_event, value) => {
                  onPageChange(Number(value));
                }}
              />
            </Box>
          )}
          <Divider style={{ marginTop: "-1px" }} />
          <CollectionCardList
            {...{ ...(collectionListProps as any) }}
            isSelectOnly={true}
            selectCollection={collection}
            onSelectItem={(item) => {
              onSelected(item as Co);
              // setSelectCollectionMeta(item as any);
              setDropdownStatus((prev) => (prev === "up" ? "down" : "up"));
              setModalState(false);
            }}
          />
          <Divider style={{ marginTop: "-1px" }} />
          {total > CollectionLimit && (
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"right"}
              marginRight={3}
              marginBottom={2}
            >
              <Pagination
                color={"primary"}
                count={
                  parseInt(String(total / NFTLimit)) +
                  (total % NFTLimit > 0 ? 1 : 0)
                }
                page={page}
                onChange={(_event, value) => {
                  onPageChange(Number(value));
                }}
              />
            </Box>
          )}
          <Toast
            alertText={
              collectionListProps.copyToastOpen?.type === "json"
                ? t("labelCopyMetaClip")
                : t("labelCopyAddClip")
            }
            open={collectionListProps.copyToastOpen?.isShow}
            autoHideDuration={TOAST_TIME}
            onClose={() => {
              collectionListProps.setCopyToastOpen({ isShow: false, type: "" });
            }}
            severity={"success"}
          />
        </SwitchPanelStyled>
      </Modal>
    </Box>
  );
};
