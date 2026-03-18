import { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Spinner,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import { useAsyncList } from "@react-stately/data";
import UserProfile2 from "../board/UserProfile2";
import { Button, GoToLatestAndQuizList } from "../../components";

function RankPage() {
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const token = sessionStorage.getItem("aivle19_token");
  const [profiles, setProfiles] = useState({});
  const [displayCount, setDisplayCount] = useState(10);

  let list = useAsyncList({
    async load({ signal, cursor }) {
      if (cursor) {
        setPage((prev) => prev + 1);
      }

      const res = await fetch(
        cursor || import.meta.env.VITE_API_URL + "/rank/",
        { signal },
      );
      let json = await res.json();
      console.log(json);

      if (!cursor) {
        setIsLoading(false);
      }

      return {
        items: json,
        cursor: json.next,
      };
    },
  });

  const [displayItems, setDisplayItems] = useState(
    list.items.slice(0, displayCount),
  );

  useEffect(() => {
    setDisplayItems(list.items.slice(0, displayCount));
  }, [list.items, displayCount]);

  const loadMoreItems = () => {
    // "더 보기" 버튼을 누르면 추가로 아이템을 보여줌
    setDisplayCount((prevCount) => prevCount + 2);
  };

  const hasMore = page < 9;

  return (
    <div className="flex">
      <div className="w-0 lg:w-[320px] pt-[63px] lg:block hidden">
        <GoToLatestAndQuizList />
      </div>
      <div className="page pt-[99px] p-4 overflow-y-auto max-h-48">
        <Table
          bottomContent={
            hasMore && !isLoading ? (
              <div className="flex w-full justify-center">
                <Button onClick={loadMoreItems} isLong={true}>
                  {list.isLoading && <Spinner color="white" size="sm" />}더보기
                </Button>
              </div>
            ) : null
          }
          classNames={{
            base: "h-[100%] overflow-scroll",
            table: "min-h-[590px]",
          }}
        >
          <TableHeader>
            <TableColumn style={{ paddingLeft: "95px" }} key="rank">
              순위
            </TableColumn>
            <TableColumn style={{ paddingLeft: "102px" }} key="username">
              아이디
            </TableColumn>
            <TableColumn style={{ paddingLeft: "112px" }} key="user_level">
              레벨
            </TableColumn>
            <TableColumn style={{ paddingLeft: "145px" }} key="created_dt">
              클리어 시간
            </TableColumn>
          </TableHeader>
          <TableBody
            isLoading={isLoading}
            items={displayItems.map((item, index) => ({
              ...item,
              rank: index + 1,
            }))}
            loadingContent={<Spinner label="Loading..." />}
          >
            {(item, index) => (
              <TableRow key={item.user_id} style={{ height: "50px" }}>
                {(columnKey, cellIndex) => (
                  <TableCell style={{ paddingLeft: "100px" }}>
                    {columnKey === "username" ? (
                      <Popover placement="right">
                        <PopoverTrigger>
                          <span>{getKeyValue(item, columnKey)}</span>
                        </PopoverTrigger>
                        <PopoverContent>
                          <div className="px-1 py-2">
                            <UserProfile2
                              userId={item.user_id}
                              token={token}
                              profiles={profiles}
                              setProfiles={setProfiles}
                            />
                          </div>
                        </PopoverContent>
                      </Popover>
                    ) : columnKey === "rank" ? (
                      item.rank <= 3 ? (
                        "👑"
                      ) : (
                        getKeyValue(item, columnKey)
                      )
                    ) : columnKey === "user_level" ? (
                      `${getKeyValue(item, columnKey)} Level`
                    ) : columnKey === "created_dt" ? (
                      new Date(getKeyValue(item, columnKey)).toLocaleString()
                    ) : (
                      getKeyValue(item, columnKey)
                    )}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default RankPage;
