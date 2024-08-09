"use client";
import React, { useEffect, useState } from "react";
import { Row, Col, Modal, Button, Form, Offcanvas } from "react-bootstrap";
import CustomTable from "./Components/CustomTable";
import { MdModeEditOutline } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLink,
  faCalendarDays,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Define types for the various data objects
interface DataRow {
  id: number;
  platform: string;
  comment_category: string;
  checker: string;
  content: string;
  url: string;
  status: string;
  comment_author: string;
  title: string;
  priority: string;
  relevancy: string;
  reply_required: boolean;
  modified_by: string;
}

interface Category {
  key: string;
  value: string;
}

interface Platform {
  key: string;
  value: string;
}

interface Priority {
  key: string;
  value: string;
}

interface Checker {
  key: string;
  value: string;
}

const CST: React.FC = () => {
  const defaultEndDate = new Date();
  const defaultStartDate = new Date();
  defaultStartDate.setDate(defaultStartDate.getDate() - 7);

  const [data, setData] = useState<DataRow[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [checker, setChecker] = useState<Checker[]>([]);
  const [priority, setPriority] = useState<Priority[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<DataRow | null>(null);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState<Date | null>(defaultStartDate);
  const [endDate, setEndDate] = useState<Date | null>(defaultEndDate);
  const [status, setStatus] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");
  const [selectedCheckers, setSelectedCheckers] = useState("");

  const columns = [
    { header: "Platform", field: "platform" },
    { header: "Comment Category", field: "comment_category" },
    { header: "Checker", field: "checker" },
    { header: "Content", field: "content" },
    {
      header: "URL",
      field: "url",
      cell: (row: DataRow) => (
        <a
          href={row.url}
          title={row.url}
          style={{ color: "purple" }}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faLink} />
        </a>
      ),
    },
    {
      header: "Action",
      field: "action",
      cell: (row: DataRow) => (
        <span
          style={{ cursor: "pointer" }}
          onClick={() => handleEditClick(row)}
        >
          <MdModeEditOutline color="#A21094" />
        </span>
      ),
    },
  ];

  useEffect(() => {
    fetchData();
    fetchCategories();
    fetchPlatforms();
    fetchCheckers();
    fetchPriority();
  }, [
    startDate,
    endDate,
    status,
    selectedPlatform,
    selectedPriority,
    selectedCheckers,
  ]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        startDate: startDate ? startDate.toISOString().split("T")[0] : "",
        endDate: endDate ? endDate.toISOString().split("T")[0] : "",
        status,
        platform: selectedPlatform,
        priority: selectedPriority,
        checker: selectedCheckers,
      }).toString();

      const response = await fetch(
        `https://bi_social_tool.mfilterit.net/get_colgate_table_fields?${params}`
      );

      const result = await response.json();
      setData(result?.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  console.log(data, "asdasdadsadadas");

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        "https://bi_social_tool.mfilterit.net/get_colgate_categories"
      );
      const result = await response.json();
      setCategories(result.categories || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchPlatforms = async () => {
    try {
      const response = await fetch(
        "https://bi_social_tool.mfilterit.net/get_colgate_platforms"
      );
      const result = await response.json();
      setPlatforms(result.platforms || []);
    } catch (error) {
      console.error("Error fetching platforms:", error);
    }
  };

  const fetchPriority = async () => {
    try {
      const response = await fetch(
        "https://bi_social_tool.mfilterit.net/get_colgate_priorities"
      );
      const result = await response.json();
      setPriority(result.priorities || []);
    } catch (error) {
      console.error("Error fetching priorities:", error);
    }
  };

  const fetchCheckers = async () => {
    try {
      const response = await fetch(
        "https://bi_social_tool.mfilterit.net/get_colgate_checkers"
      );
      const result = await response.json();
      setChecker(result.checkers || []);
    } catch (error) {
      console.error("Error fetching checkers:", error);
    }
  };

  useEffect(() => {
    console.log("Selected Status:", selectedStatus);
  }, [selectedStatus]);

  const handleRowClick = (row: DataRow) => {
    setSelectedRow(row);
    setSelectedCategory(row.comment_category);
    setSelectedStatus(row.status);
    setShowModal(true);
  };

  const handleEditClick = (row: DataRow) => {
    setSelectedRow(row);
    setSelectedCategory(row.comment_category);
    setSelectedStatus(row.status);
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!selectedRow) return;

    try {
      const response = await fetch(
        "https://bi_social_tool.mfilterit.net/update_colgate_category",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ProductID: selectedRow.id,
            Category: selectedCategory,
            Status: selectedStatus,
          }),
        }
      );

      const result = await response.json();

      if (result.status === "Success") {
        toast.success(result.message);
        setShowModal(false);
        fetchData();
      } else {
        console.error("Failed to update category");
        fetchData();
      }
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedStatus("");
    setSelectedCategory("");
  };

  return (
    <div style={{ marginLeft: "15rem" , padding:"5px" }}>
      <div
        className="button-container"
        style={{ textAlign: "right", marginBottom: "5px" }}
      >
        <Button
          title="Filters"
          style={{ backgroundColor: "purple" }}
          variant="primary"
          className="filter-icon"
          onClick={() => setShowDrawer(true)}
        >
          <FontAwesomeIcon icon={faFilter} />
        </Button>
      </div>

      <Offcanvas
        show={showDrawer}
        onHide={() => setShowDrawer(false)}
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Filters</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>
                <FontAwesomeIcon icon={faCalendarDays} /> Start Date
              </Form.Label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                placeholderText="Select Start Date"
                className="form-control"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                <FontAwesomeIcon icon={faCalendarDays} /> End Date
              </Form.Label>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                placeholderText="Select End Date"
                className="form-control"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">Select Status</option>
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Closed">Closed</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Platform</Form.Label>
              <Form.Control
                as="select"
                value={selectedPlatform}
                onChange={(e) => setSelectedPlatform(e.target.value)}
              >
                <option value="">Select Platform</option>
                {platforms.map((platform) => (
                  <option key={platform.key} value={platform.value}>
                    {platform.key}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Priority</Form.Label>
              <Form.Control
                as="select"
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
              >
                <option value="">Select Priority</option>
                {priority.map((priorityItem) => (
                  <option key={priorityItem.key} value={priorityItem.value}>
                    {priorityItem.key}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Checkers</Form.Label>
              <Form.Control
                as="select"
                value={selectedCheckers}
                onChange={(e) => setSelectedCheckers(e.target.value)}
              >
                <option value="">Select Checkers</option>
                {checker.map((checkerItem) => (
                  <option key={checkerItem.key} value={checkerItem.value}>
                    {checkerItem.key}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
      <div className="tableClass">
        <CustomTable
          loading={loading}
          columns={columns}
          data={data ?? []}
          onRowClick={handleRowClick}
        />
      </div>
      <Toaster />

      {selectedRow && (
        <Modal show={showModal} onHide={handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>View Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category.key} value={category.value}>
                    {category.key}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="">Select Status</option>
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Closed">Closed</option>
              </Form.Control>
            </Form.Group>
            <hr />
            <div>
              <h6>
                <b>Comment Author:</b> {selectedRow.comment_author}
              </h6>
              <h6>
                <b>Title:</b> {selectedRow.title}
              </h6>
              <h6>
                <b>Priority:</b> {selectedRow.priority}
              </h6>
              <h6>
                <b>Relevancy:</b> {selectedRow.relevancy}
              </h6>
              <h6>
                <b>Reply Required:</b>{" "}
                {selectedRow.reply_required ? "Yes" : "No"}
              </h6>
              <h6>
                <b>Modified By:</b> {selectedRow.modified_by}
              </h6>
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleModalClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSave}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default CST;
