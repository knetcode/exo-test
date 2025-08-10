"use client";

import * as React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { XMLGroup } from "@/utils/xml-parser";
import { maskId } from "@/utils/id-mask";

type Props = {
  data: XMLGroup[];
};

export function XMLDataTable({ data }: Readonly<Props>) {
  const tableData = data.length > 0 ? data[0].rows : [];

  return (
    <div className="w-full">
      <div className="overflow-hidden rounded-md border border-border/50">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/20">
              {data.map((group, groupIndex) => (
                <TableHead
                  key={groupIndex}
                  colSpan={Math.max(1, group.columns.length)}
                  className="text-center text-sm font-semibold border-r border-border/50"
                >
                  <div className="text-teal-700 font-semibold">{group.moduleDescription}</div>
                  <div className="text-xs font-mono text-teal-600">{group.moduleCode}</div>
                </TableHead>
              ))}
            </TableRow>
            <TableRow className="bg-muted/20">
              {data.map((group) => {
                if (group.columns.length === 0) {
                  return (
                    <TableHead
                      key={group.moduleCode}
                      className="text-sm font-medium border-r border-border/50 text-teal-600"
                    >
                      -
                    </TableHead>
                  );
                } else {
                  return group.columns.map((columnName, colIndex) => (
                    <TableHead
                      key={`${group.moduleCode}-${colIndex}`}
                      className="text-sm font-medium border-r border-border/50 text-teal-600"
                    >
                      {columnName}
                    </TableHead>
                  ));
                }
              })}
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData.length > 0 ? (
              tableData.map((row, rowIndex) => (
                <TableRow key={rowIndex} className={rowIndex % 2 === 0 ? "bg-background" : "bg-muted/10"}>
                  {data.map((group) => {
                    if (group.columns.length === 0) {
                      return (
                        <TableCell key={group.moduleCode} className="border-r border-border/50">
                          <div className="text-sm text-muted-foreground">-</div>
                        </TableCell>
                      );
                    } else {
                      return group.columns.map((columnName, colIndex) => {
                        if (columnName === "Identification Number") {
                          return (
                            <TableCell key={`${group.moduleCode}-${colIndex}`} className="border-r border-border/50">
                              <div className="text-sm font-mono">{maskId(row[columnName] ?? "-")}</div>
                            </TableCell>
                          );
                        } else {
                          return (
                            <TableCell key={`${group.moduleCode}-${colIndex}`} className="border-r border-border/50">
                              <div className="text-sm">{row[columnName] ?? "-"}</div>
                            </TableCell>
                          );
                        }
                      });
                    }
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={data.reduce((total, group) => total + Math.max(1, group.columns.length), 0)}
                  className="h-24 text-center text-muted-foreground"
                >
                  No XML data available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
