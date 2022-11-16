import { Meta, Story } from "@storybook/react/types-6-0";
import { WithTranslation, withTranslation } from "react-i18next";
import styled from "@emotion/styled";
import { Grid, Typography } from "@mui/material";
import {
  DepthHIcon,
  DepthFIcon,
  UpIcon,
  DragIcon,
  DragListIcon,
  ResizeIcon,
  AssetsIcon,
  L2MyLiquidityIcon,
  L2HistoryIcon,
  RewardIcon,
  RedPockIcon,
  SecurityIcon,
  VipIcon,
  L2OrderIcon,
  CheckBoxIcon,
  CheckedIcon,
  ViewIcon,
  HideIcon,
  DropDownIcon,
  BackIcon,
  MoreIcon,
  StarHollowIcon,
  StarSolidIcon,
  DownloadIcon,
  NotificationIcon,
  SettingIcon,
  LinkIcon,
  CopyIcon,
  ReverseIcon,
  HelpIcon,
  CalendarIcon,
  LinkedIcon,
  ExchangeIcon,
  CloseIcon,
  SearchIcon,
  MenuIcon,
  QRIcon,
  DoneIcon,
  RefuseIcon,
  SubmitIcon,
  FailedIcon,
  GoodIcon,
  AlertIcon,
  ErrorIcon,
  InfoIcon,
  UnConnectIcon,
  LockIcon,
  ProToLiteIcon,
  CheckIcon,
  LoadingIcon,
  PendingIcon,
  ActiveIcon,
  RefreshIcon,
  CompleteIcon,
  WaitingIcon,
  WarningIcon,
  EmptyIcon,
  CircleIcon,
  GrowIcon,
  NoPhotosIcon,
  KLineFeaturesIcon,
  LoopringDarkFooterIcon,
  LoopringLightFooterIcon,
  YoutubeIcon,
  TwitterIcon,
  MediumIcon,
  DiscordIcon,
  LoopringIcon,
  LightIcon,
  DarkIcon,
  ExitIcon,
  RampIcon,
  BanxaIcon,
  FirstPlaceIcon,
  SecondPlaceIcon,
  ThirdPlaceIcon,
  TrophyIcon,
  AmmRankIcon,
  SpeakerIcon,
  GoTopIcon,
  NFTIcon,
  RecordIcon,
  WaitApproveIcon,
  LoopringLogoIcon,
  TransferIcon,
  DepositIcon,
  WithdrawIcon,
  MintIcon,
  AddIcon,
  DeleteIcon,
  ImageIcon,
  Info2Icon,
  IncomingIcon,
  OutputIcon,
  CardIcon,
  L2l2Icon,
  L1l2Icon,
  ExchangeAIcon,
  AudioIcon,
  VideoIcon,
  PlayIcon,
  ProfileIcon,
  OrderListIcon,
  RefreshIPFSIcon,
  ViewMoreIcon,
  LikeIcon,
  ZoomIcon,
  UnlikeIcon,
  LegacyIcon,
  SyncIcon,
  FavHollowIcon,
  FavSolidIcon,
} from "@loopring-web/common-resources";

const Styled = styled.div`
  background: var(--color-global-bg);

  svg {
    height: 24px;
    width: 24px;
  }
`;

// @ts-ignore
const listIcon = [
  <DepthHIcon />,
  <DepthFIcon />,
  <UpIcon />,
  <DragIcon />,
  <DragListIcon />,
  <ResizeIcon />,
  <AssetsIcon />,
  <L2MyLiquidityIcon />,
  <L2HistoryIcon />,
  <RewardIcon />,
  <RedPockIcon />,
  <SecurityIcon />,
  <VipIcon />,
  <L2OrderIcon />,
  <CheckBoxIcon />,
  <CheckedIcon />,
  <ViewIcon />,
  <HideIcon />,
  <DropDownIcon />,
  <BackIcon />,
  <MoreIcon />,
  <StarHollowIcon />,
  <StarSolidIcon />,
  <DownloadIcon />,
  <NotificationIcon />,
  <SettingIcon />,
  <LinkIcon />,
  <CopyIcon />,
  <ReverseIcon />,
  <HelpIcon />,
  <CalendarIcon />,
  <LinkedIcon />,
  <ExchangeIcon />,
  <CloseIcon />,
  <SearchIcon />,
  <MenuIcon />,
  <QRIcon />,
  <DoneIcon />,
  <RefuseIcon />,
  <SubmitIcon />,
  <FailedIcon />,
  <GoodIcon />,
  <AlertIcon />,
  <ErrorIcon />,
  <InfoIcon />,
  <UnConnectIcon />,
  <LockIcon />,
  <ProToLiteIcon />,
  <CheckIcon />,
  <LoadingIcon />,
  <PendingIcon />,
  <ActiveIcon />,
  <RefreshIcon />,
  <CompleteIcon />,
  <WaitingIcon />,
  <WarningIcon />,
  <EmptyIcon />,
  <CircleIcon />,
  <GrowIcon />,
  <NoPhotosIcon />,
  <KLineFeaturesIcon />,
  <LoopringDarkFooterIcon />,
  <LoopringLightFooterIcon />,
  <YoutubeIcon />,
  <TwitterIcon />,
  <MediumIcon />,
  <DiscordIcon />,
  <LoopringIcon />,
  <LightIcon />,
  <DarkIcon />,
  <ExitIcon />,
  <RampIcon />,
  <BanxaIcon />,
  <FirstPlaceIcon />,
  <SecondPlaceIcon />,
  <ThirdPlaceIcon />,
  <TrophyIcon />,
  <AmmRankIcon />,
  <SpeakerIcon />,
  <GoTopIcon />,
  <NFTIcon />,
  <RecordIcon />,
  <WaitApproveIcon />,
  <LoopringLogoIcon />,
  <TransferIcon />,
  <DepositIcon />,
  <WithdrawIcon />,
  <MintIcon />,
  <AddIcon />,
  <DeleteIcon />,
  <ImageIcon />,
  <Info2Icon />,
  <IncomingIcon />,
  <OutputIcon />,
  <CardIcon />,
  <L2l2Icon />,
  <L1l2Icon />,
  <ExchangeAIcon />,
  <AudioIcon />,
  <VideoIcon />,
  <PlayIcon />,
  <ProfileIcon />,
  <OrderListIcon />,
  <RefreshIPFSIcon />,
  <ViewMoreIcon />,
  <LikeIcon />,
  <ZoomIcon />,
  <UnlikeIcon />,
  <LegacyIcon />,
  <SyncIcon />,
  <FavHollowIcon />,
  <FavSolidIcon />,
];

export const IconList: Story<any> = withTranslation()(
  ({}: WithTranslation & any) => {
    const view = listIcon.map((item, index) => {
      return (
        <Grid
          key={index}
          item
          padding={2}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
        >
          {item}
          <Typography padding={1} variant={"body2"}>
            {item.type.name}
          </Typography>
        </Grid>
      );
    });

    return (
      <>
        <Styled>
          {/*<MemoryRouter initialEntries={['/']}>*/}
          <Grid container>{view}</Grid>
        </Styled>
        {/*</MemoryRouter>*/}
      </>
    );
  }
) as Story<any>;

//export const Button = Template.bind({});
// @ts-ignore
export default {
  title: "Resource/IconsList",
  component: IconList,
  argTypes: {},
} as Meta;
// LButton.args = {}
