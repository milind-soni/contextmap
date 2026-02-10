// Copyright (c) 2025 ContextMap. Licensed under MIT License.

import type { Coordinator } from "@uwdata/mosaic-core";
import * as SQL from "@uwdata/mosaic-sql";
import type { Rectangle, Point, DataPoint } from "@embedding-atlas/component";

export interface ContextData {
  summary: string;
  points: DataPoint[];
  count: number;
  boundingBox: Rectangle;
  timestamp: number;
}

export class ContextManager {
  constructor(
    private coordinator: Coordinator,
    private table: string,
    private source: { x: string; y: string; id: string; text?: string }
  ) {}

  async extractFromSelection(
    selection: Rectangle | Point[]
  ): Promise<ContextData> {
    // Build SQL predicate for range selection
    const predicate = this.createPredicateForSelection(selection);

    // Query all points in selection
    const query = SQL.Query
      .from(this.table)
      .select({
        identifier: SQL.column(this.source.id),
        x: SQL.column(this.source.x),
        y: SQL.column(this.source.y),
        ...(this.source.text ? { text: SQL.column(this.source.text) } : {})
      })
      .where(predicate)
      .limit(1000); // Safety limit

    const result = await this.coordinator.query(query);
    const points = Array.from(result) as DataPoint[];

    return {
      summary: this.formatContext(points),
      points,
      count: points.length,
      boundingBox: Array.isArray(selection) ? this.boundingRect(selection) : selection,
      timestamp: Date.now()
    };
  }

  private formatContext(points: DataPoint[]): string {
    const lines = [
      `# Selected Context (${points.length} points)`,
      '',
      '## Data Points:',
    ];

    const samples = points.slice(0, 50);
    samples.forEach((pt, idx) => {
      lines.push(`${idx + 1}. [${pt.x.toFixed(2)}, ${pt.y.toFixed(2)}]`);
      if (pt.text) {
        lines.push(`   ${pt.text.slice(0, 200)}`);
      }
    });

    if (points.length > 50) {
      lines.push(`... and ${points.length - 50} more points`);
    }

    return lines.join('\n');
  }

  private boundingRect(points: Point[]): Rectangle {
    // Simple bounding box calculation
    const xs = points.map(p => p.x);
    const ys = points.map(p => p.y);
    return {
      xMin: Math.min(...xs),
      xMax: Math.max(...xs),
      yMin: Math.min(...ys),
      yMax: Math.max(...ys)
    };
  }

  private createPredicateForSelection(selection: Rectangle | Point[]): SQL.ExprNode {
    if (Array.isArray(selection)) {
      // Lasso selection - use bounding box for simplicity
      if (selection.length < 3) {
        return SQL.literal(false);
      }
      const bounds = this.boundingRect(selection);
      return SQL.and(
        SQL.isBetween(SQL.column(this.source.x), [bounds.xMin, bounds.xMax]),
        SQL.isBetween(SQL.column(this.source.y), [bounds.yMin, bounds.yMax])
      );
    } else {
      // Rectangle selection
      return SQL.and(
        SQL.isBetween(SQL.column(this.source.x), [selection.xMin, selection.xMax]),
        SQL.isBetween(SQL.column(this.source.y), [selection.yMin, selection.yMax])
      );
    }
  }
}
