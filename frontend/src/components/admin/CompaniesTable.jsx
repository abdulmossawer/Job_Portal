import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector(
    (store) => store.company
  );
  const [filterCompany, setFilterCompany] = useState(companies);

  const navigate = useNavigate();

  useEffect(() => {
    const filteredCompany =
      companies.length >= 0 &&
      companies.filter((company) => {
        if (!searchCompanyByText) {
          return true;
        }
        return company?.name
          ?.toLowerCase()
          .includes(searchCompanyByText.toLowerCase());
      });
    setFilterCompany(filteredCompany);
  }, [companies, searchCompanyByText]);

  return (
    <div className="overflow-x-auto bg-light dark:bg-dark">
      <Table className="border-light dark:border-dark">
        <TableCaption className="text-white dark:text-dark">
          List of your recent registered companies
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-white dark:text-dark">Logo</TableHead>
            <TableHead className="text-white dark:text-dark">Name</TableHead>
            <TableHead className="text-white dark:text-dark">Date</TableHead>
            <TableHead className="text-right text-white dark:text-dark">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.isArray(companies) ? (
            filterCompany.map((company) => (
              <TableRow key={company.id}>
                <TableCell>
                  <Avatar>
                    <AvatarImage src={company.logo} />
                  </Avatar>
                </TableCell>
                <TableCell className="text-white dark:text-dark">{company.name}</TableCell>
                <TableCell className="text-white dark:text-dark">
                  {company.createdAt.split("T")[0]}
                </TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal className="h-4 w-4 text-white dark:text-dark" />
                    </PopoverTrigger>
                    <PopoverContent className="w-32 bg-white dark:bg-dark">
                      <div
                        onClick={() =>
                          navigate(`/admin/companies/${company._id}`)
                        }
                        className="flex items-center gap-2 cursor-pointer text-black dark:text-dark"
                      >
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan="4" className="text-light dark:text-dark">
                No companies available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;
