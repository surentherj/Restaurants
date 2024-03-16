import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CloseIconSmall from "../../components/icons/close-s";
import EditIcon from "../../components/icons/edit";
import SearchIcon from "../../components/icons/search";
import TickIcon from "../../components/icons/tickIcon";
import Sidedraw from "../../components/sidedraw";
import {
  deleteList,
  getListsOnLazyScroll,
  getReviews,
} from "../../redux/actions/landingPage";
import AddOrEditScreen from "./addOrEditScreen";
import ViewScreen from "./viewScreen";
import DeleteIcon from "../../components/icons/delete";

const LandingPage = () => {
  const dispatch = useDispatch();
  const itemListRef = useRef();
  const tableRef = useRef(null);
  const [listDetail, setListDetail] = useState({});
  const [addOredit, setAddorEdit] = useState(false);
  const [view, setView] = useState(false);
  const { startAt, maxResult, searchValue, total, lists, user } = useSelector(
    (state) => ({
      maxResult: state?.landingPage?.maxResult || 20,
      startAt: state?.landingPage?.startAt || 0,
      searchValue: state?.landingPage?.searchValue || "",
      total: state?.landingPage?.total || 0,
      lists: state?.landingPage?.lists || [],
      user: state?.auth?.user,
    })
  );
  const { listing } = user?.roleAccess?.privileges || {};
  useEffect(() => {
    itemListRef.current = {
      total,
      lists,
      searchValue,
    };
  }, [total, lists, searchValue]);

  useEffect(() => {
    dispatch(
      getListsOnLazyScroll({
        startAt: 0,
        maxResult: 20,
        searchValue: "",
      })
    );
  }, []);

  const handleLazyScroll = () => {
    let { lists, total, searchValue } = itemListRef.current;
    const { scrollTop, clientHeight, scrollHeight } = tableRef.current;
    if (scrollTop + clientHeight >= scrollHeight - 10) {
      if (startAt + maxResult < total && lists.length < total) {
        dispatch(
          getListsOnLazyScroll({
            startAt: startAt + maxResult,
            maxResult,
            searchValue,
          })
        );
      }
    }
  };

  useEffect(() => {
    const sidebarElement = tableRef?.current;
    sidebarElement.addEventListener("scroll", handleLazyScroll);
    return () => {
      sidebarElement.removeEventListener("scroll", handleLazyScroll);
    };
  }, [startAt, total, lists?.length, dispatch]);

  const currentHour = new Date().getHours();
  return (
    <>
      <div className="content-wrapper">
        <div className="container-fluid" id="homePageHeader">
          <div className="row mb-two-s align-self-stretch">
            <h2 className="font-r ml-one-s font-medium grey1">
              {currentHour >= 5 && currentHour < 12
                ? "Good Morning"
                : currentHour >= 12 && currentHour < 18
                ? "Good Afternoon"
                : "Good Evening"}
              , {localStorage?.name}
            </h2>
          </div>
          <div className="row ">
            <div className="col-xl-12 col-lg-12 col-md-12  d-flex align-items-center flex-center-space-between">
              <div className="d-flex align-items-center">
                <div className="form-group pointer filter-search">
                  <input
                    placeholder="Name/Owner/Address"
                    className="form-control size-s"
                    onChange={(e) => {
                      dispatch(
                        getListsOnLazyScroll({
                          startAt: 0,
                          maxResult: 20,
                          searchValue: e.target.value?.trim(),
                        })
                      );
                    }}
                    value={searchValue}
                  />
                  <div className="form-icon">
                    <div className="icon-wrap icon-s">
                      <SearchIcon />
                    </div>
                  </div>
                </div>
                <div className="ml-two-s">
                  <div className="font-s">
                    Showing {lists?.length} out of {total} lists
                    {lists?.length !== total && (
                      <>, to fetch more just scroll the list</>
                    )}
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <div className="font-s">
                  Note: Scroll list to fecth next set
                </div>
                {listing?.create && (
                  <div
                    className="btn btn-xsmall ml-two-s btn-primary-border"
                    onClick={() => {
                      setListDetail({ availability: true });
                      setAddorEdit(true);
                    }}
                  >
                    + Add New
                  </div>
                )}
              </div>
            </div>
            <div className="col-lg-12 col-md-12 mt-one-s">
              <div
                className={`table-wrapper issue-list-table
        }`}
                style={{ overflowX: "auto" }}
                ref={tableRef}
              >
                {lists?.length > 0 ? (
                  <table>
                    <thead>
                      <tr className="table-head-row zIndex">
                        <th className={`table-head-column`}>Restaurant</th>
                        <th className={`table-head-column`}>Description</th>
                        <th className={`table-head-column`}>Veg/Non-Veg</th>
                        <th className={`table-head-column`}>Owner</th>
                        <th className={`table-head-column`}>Contact Details</th>
                        <th className={`table-head-column`}>Cost/Person</th>
                        <th className={`table-head-column`}>Availability</th>
                        <th className={`table-head-column`}></th>
                      </tr>
                    </thead>
                    <tbody className="list-table-body">
                      {lists?.map((item) => (
                        <tr
                          className={`table-row pointer`}
                          onClick={(e) => {
                            e.stopPropagation();
                            dispatch(getReviews(item.id));
                            setListDetail(item);
                            setView(true);
                          }}
                        >
                          <td className="table-column ">
                            <div className="d-flex align-items-center">
                              <img
                                src={
                                  item?.imageUrl ||
                                  "https://www.shutterstock.com/image-photo/restaurant-chilling-out-classy-lifestyle-260nw-507639565.jpg"
                                }
                                alt=""
                                height="50"
                                width="50"
                              />

                              <div className="ml-one-s font-bold">
                                {item?.name}
                              </div>
                            </div>
                          </td>
                          <td className="table-column">{item.description}</td>
                          <td className="table-column">
                            {item.nonVeg ? "🔴 Non-Veg" : "🟢 Veg"}
                          </td>
                          <td className="table-column">{item?.owner}</td>
                          <td className="table-column">
                            {(item?.address || "") + " " + (item?.phone || "")}
                          </td>
                          <td className="table-column">
                            ₹{item?.costPerPerson}
                          </td>

                          <td className="table-column">
                            <div className="icon-wrap icon-s">
                              {item?.availability ? (
                                <TickIcon fill={"green"} />
                              ) : (
                                <CloseIconSmall fill={"red"} />
                              )}
                            </div>
                          </td>
                          <td className="table-column">
                            <>
                              {listing?.update && (
                                <div
                                  className="icon-wrap icon-s"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setListDetail(item);
                                    setAddorEdit(true);
                                  }}
                                >
                                  <EditIcon fill={"grey"} />
                                </div>
                              )}
                              {listing?.delete && (
                                <div
                                  className="icon-wrap icon-s"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    dispatch(deleteList(item.id));
                                  }}
                                >
                                  <DeleteIcon fill={"red"} />
                                </div>
                              )}
                            </>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="table-wrapper issue-list-table d-flex align-items-center justify-content-center">
                    <h3>No Restaurant Found</h3>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {addOredit && (
        <Sidedraw
          size="small"
          title={listDetail?.id ? "Edit Restaurant" : "Add Restaurant"}
          setOverlay={setAddorEdit}
          contentComponent={
            <div className="wd-100 mt-two-s">
              <AddOrEditScreen
                listDetail={listDetail}
                setAddorEdit={setAddorEdit}
              />
            </div>
          }
        />
      )}
      {view && (
        <Sidedraw
          size="medium"
          title={listDetail?.name}
          setOverlay={setView}
          contentComponent={
            <div className="wd-100 mt-two-s">
              <ViewScreen list={listDetail} setView={setView} />
            </div>
          }
        />
      )}
    </>
  );
};

export default LandingPage;
