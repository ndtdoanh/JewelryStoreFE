import { RollbackOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Input, notification, Spin } from "antd";
import { useState } from "react";
import CreateCategoryModal from "../category/CategoryManagement/CreateCategoryModal";
import CategoryList from "../category/CategoryManagement/CategoryList";
import "../category/Category.css";
import { useNavigate } from "react-router-dom";
import { useGetCategoriesQuery } from "../../services/categoryAPI";
import { useAddCategoriesMutation } from "../../services/categoryAPI";
import { useEditCategoriesMutation } from "../../services/categoryAPI";
import { useDeleteCategoriesMutation } from "../../services/categoryAPI";
import { useSelector } from "react-redux";
import { selectAuth } from "../../slices/auth.slice";

export default function Category() {
  const [addCategory, { isLoading: isLoadingAdd }] = useAddCategoriesMutation();
  const [editCategory] = useEditCategoriesMutation();
  const [deleteCategory] = useDeleteCategoriesMutation();
  const [categorySearchInput, setCategorySearchInput] = useState("");
  const { data: categoryData, refetch } = useGetCategoriesQuery();
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/product");
  };
  const auth = useSelector(selectAuth);
  const handleCategorySearchInputChange = (e) => {
    setCategorySearchInput(e.target.value);
  };

  // Apply map and then filter on categoryData
  const filteredProducts = categoryData
    ?.map((category) => ({
      ...category,
    }))
    ?.filter((category) =>
      category?.typeName
        ?.toLowerCase()
        .includes(categorySearchInput.toLowerCase())
    );

  //handle addCategory
  const handleAddCategory = async (values) => {
    try {
      await addCategory(values).unwrap();
      notification.success({
        message: "Create category successfully !!!",
      });
      refetch();
    } catch (error) {
      console.log(error);
      notification.error({
        message: "Create category failed !!!",
      });
    }
  };

  // Handle editCategory
  const handleEditCategory = async (values) => {
    try {
      await editCategory(values).unwrap();
      notification.success({
        message: "Update category successfully !!!",
      });
      refetch();
    } catch (error) {
      console.log(error);
      notification.error({
        message: "Update category failed !!!",
      });
    }
  };

  // Handle deleteCategory
  const handleDeleteCategory = async (values) => {
    try {
      await deleteCategory(values).unwrap();
      notification.success({
        message: "Delete category successfully !!!",
      });
      refetch();
    } catch (error) {
      console.log(error);
      notification.error({
        message: "Delete category failed !!!",
      });
    }
  };

  // Handle loading state
  if (!categoryData) {
    return (
      <div>
        <Spin
          size="large"
          style={{
            position: "fixed",
            top: "45%",
            left: "55%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="h1">Category Page</h1>

      <div className="action">
        <div className="action-left">
          <Input
            style={{ borderRadius: 20, width: "350px" }}
            size="large"
            placeholder="Search by category"
            prefix={<SearchOutlined />}
            value={categorySearchInput}
            onChange={handleCategorySearchInputChange}
          />
        </div>
        <div className="edit-header-button">
          <div>
            <Button
              type="primary"
              onClick={handleBack}
              icon={<RollbackOutlined />}
            >
              Back to Product page
            </Button>
          </div>

          {auth.Role == "1" ? null : (
            <div className="action-right">
              <div className="">
                <CreateCategoryModal
                  onCreate={handleAddCategory}
                  loading={isLoadingAdd}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div>
        <CategoryList
          categoryData={filteredProducts}
          handleDeleteCategory={handleDeleteCategory}
          handleEditCategory={handleEditCategory}
        />{" "}
        {/* Truyền filteredProducts thay vì categoryData */}
      </div>
    </div>
  );
}
