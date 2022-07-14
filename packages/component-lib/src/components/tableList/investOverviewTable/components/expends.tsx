import { InvestRowAction, RowInvest, SubRowAction } from "../Interface";
import { DepartmentRow } from "../Interface";

function toggleSubRow(rows: RowInvest[], symbol: string): RowInvest[] {
  const rowIndex = rows.findIndex((r) => r?.token?.symbol === symbol);
  const row = rows[rowIndex];
  const { children } = row;
  if (!children) return rows;

  const newRows = [...rows];
  newRows[rowIndex] = { ...row, isExpanded: !row.isExpanded };
  if (!row.isExpanded) {
    // @ts-ignore
    newRows.splice(rowIndex + 1, 0, ...children);
  } else {
    newRows.splice(rowIndex + 1, children.length);
  }
  return newRows;
}
export function investRowReducer(
  rows: DepartmentRow[],
  { type, symbol }: InvestRowAction
): DepartmentRow[] {
  switch (type) {
    case SubRowAction.ToggleSubRow:
      return toggleSubRow(rows, symbol);
    // case "deleteSubRow":
    //   return deleteSubRow(rows, id);
    default:
      return rows;
  }
}

// export default function ExpendsDetail({ direction }: any) {
//   const columns = React.useMemo((): readonly Column<InvestItem>[] => {
//     return [
//       {
//         key: "pools",
//         sortable: false,
//         width: "auto",
//         name: t("labelPool"),
//         formatter: ({ row }) => {
//           return (
//             <PoolStyle
//               display={"flex"}
//               flexDirection={"column"}
//               alignContent={"flex-start"}
//               justifyContent={"center"}
//             >
//               <IconColumn
//                 account={account}
//                 row={row.ammDetail as any}
//                 size={20}
//               />
//             </PoolStyle>
//           );
//         },
//       },
//       {
//         key: "liquidity",
//         sortable: true,
//         headerCellClass: "textAlignRightSortable",
//         name: t("labelMyLiquidity"), //+ "/" + t("labelFeeEarned")
//         formatter: ({ row }) => {
//           if (!row || !row.ammDetail) {
//             return (
//               <Box
//                 display={"flex"}
//                 justifyContent={"flex-end"}
//                 alignItems={"center"}
//               />
//             );
//           }
//           const {
//             balanceDollar,
//             balanceA,
//             balanceB,
//             ammDetail: { coinAInfo, coinBInfo },
//           } = row as any;
//
//           return (
//             <Box
//               className={"textAlignRight"}
//               display={"flex"}
//               flexDirection={"column"}
//               height={"100%"}
//               justifyContent={"center"}
//             >
//               <Typography component={"span"}>
//                 {typeof balanceDollar === "undefined"
//                   ? EmptyValueTag
//                   : PriceTag[CurrencyToTag[currency]] +
//                     getValuePrecisionThousand(
//                       (balanceDollar || 0) * (forexMap[currency] ?? 0),
//                       undefined,
//                       undefined,
//                       2,
//                       true,
//                       { isFait: true, floor: true }
//                     )}
//               </Typography>
//               <Typography
//                 component={"span"}
//                 variant={"body2"}
//                 color={"textSecondary"}
//               >
//                 {getValuePrecisionThousand(balanceA, undefined, 2, 2, true, {
//                   isAbbreviate: true,
//                   abbreviate: 3,
//                 }) +
//                   " " +
//                   coinAInfo.simpleName +
//                   `  +  ` +
//                   getValuePrecisionThousand(balanceB, undefined, 2, 2, true, {
//                     isAbbreviate: true,
//                     abbreviate: 3,
//                   }) +
//                   " " +
//                   coinBInfo.simpleName}
//               </Typography>
//             </Box>
//           );
//         },
//       },
//       {
//         key: "APR",
//         sortable: true,
//         name: t("labelAPR"),
//         width: "auto",
//         maxWidth: 80,
//         headerCellClass: "textAlignRightSortable",
//         formatter: ({ row }) => {
//           const APR =
//             typeof row?.ammDetail?.APR !== undefined && row.ammDetail.APR
//               ? row.ammDetail.APR
//               : EmptyValueTag;
//           return (
//             <Box className={"textAlignRight"}>
//               <Typography component={"span"}>
//                 {APR === EmptyValueTag || typeof APR === "undefined"
//                   ? EmptyValueTag
//                   : getValuePrecisionThousand(APR, 2, 2, 2, true) + "%"}
//               </Typography>
//             </Box>
//           );
//         },
//       },
//       {
//         key: "action",
//         name: "",
//         headerCellClass: "textAlignRight",
//         formatter: ({ row }) => {
//           const popoverProps: PopoverWrapProps = {
//             type: PopoverType.click,
//             popupId: "testPopup",
//             className: "arrow-none",
//             children: <MoreIcon cursor={"pointer"} />,
//             popoverContent: (
//               <ActionPopContent
//                 {...{ row, allowTrade, handleWithdraw, handleDeposit, t }}
//               />
//             ),
//             anchorOrigin: {
//               vertical: "bottom",
//               horizontal: "right",
//             },
//             transformOrigin: {
//               vertical: "top",
//               horizontal: "right",
//             },
//           } as PopoverWrapProps;
//           return (
//             <Grid item marginTop={1}>
//               <Popover {...{ ...popoverProps }} />
//             </Grid>
//           );
//         },
//       },
//     ];
//   }, [direction]);
//   const [rows, setRows] = useState(createDepartments);
//
//   function onRowsChange(
//     rows: DepartmentRow[],
//     { indexes }: RowsChangeData<DepartmentRow>
//   ) {
//     const row = rows[indexes[0]];
//     if (row.type === "MASTER") {
//       if (!row.expanded) {
//         rows.splice(indexes[0] + 1, 1);
//       } else {
//         rows.splice(indexes[0] + 1, 0, {
//           type: "DETAIL",
//           id: row.id + 100,
//           parentId: row.id,
//         });
//       }
//       setRows(rows);
//     }
//   }
//
//   return (
//     <DataGrid
//       rowKeyGetter={rowKeyGetter}
//       columns={columns}
//       rows={rows}
//       onRowsChange={onRowsChange}
//       headerRowHeight={45}
//       rowHeight={(args) =>
//         args.type === "ROW" && args.row.type === "DETAIL" ? 300 : 45
//       }
//       className="fill-grid"
//       enableVirtualization={false}
//       direction={direction}
//     />
//   );
// }
