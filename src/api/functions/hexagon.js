'use strict';

function Point(x, y) {
    return {x: x, y: y};
}

function Hex(q, r, s) {
    return {q: q, r: r, s: s};
}

function add(a, b)
{
    return Hex(a.q + b.q, a.r + b.r, a.s + b.s);
}

function subtract(a, b)
{
    return Hex(a.q - b.q, a.r - b.r, a.s - b.s);
}

function scale(a, k)
{
    return Hex(a.q * k, a.r * k, a.s * k);
}

var directions = [Hex(1, 0, -1), Hex(1, -1, 0), Hex(0, -1, 1), Hex(-1, 0, 1), Hex(-1, 1, 0), Hex(0, 1, -1)];

function direction(direction)
{
    return directions[direction];
}

function neighbor(hex, direction)
{
    return add(hex, direction(direction));
}

function diagonal_neighbor(hex, direction)
{
    return add(hex, diagonals[direction]);
}

function length(hex)
{
    return Math.trunc((Math.abs(hex.q) + Math.abs(hex.r) + Math.abs(hex.s)) / 2);
}

function distance(a, b)
{
    return length(subtract(a, b));
}

function round(h)
{
    var q = Math.trunc(Math.round(h.q));
    var r = Math.trunc(Math.round(h.r));
    var s = Math.trunc(Math.round(h.s));
    var q_diff = Math.abs(q - h.q);
    var r_diff = Math.abs(r - h.r);
    var s_diff = Math.abs(s - h.s);
    if (q_diff > r_diff && q_diff > s_diff)
    {
        q = -r - s;
    }
    else
    if (r_diff > s_diff)
    {
        r = -q - s;
    }
    else
    {
        s = -q - r;
    }
    return Hex(q, r, s);
}

function lerp(a, b, t)
{
    return Hex(a.q + (b.q - a.q) * t, a.r + (b.r - a.r) * t, a.s + (b.s - a.s) * t);
}

function linedraw(a, b)
{
    var N = distance(a, b);
    var results = [];
    var step = 1.0 / Math.max(N, 1);
    for (var i = 0; i <= N; i++)
    {
        results.push(round(lerp(a, b, step * i)));
    }
    return results;
}

function OffsetCoord(col, row) {
    return {col: col, row: row};
}

var EVEN = 1;
var ODD = -1;

function qoffset_from_cube(offset, h)
{
    var col = h.q;
    var row = h.r + Math.trunc((h.q + offset * (h.q & 1)) / 2);
    return OffsetCoord(col, row);
}

function qoffset_to_cube(offset, h)
{
    var q = h.col;
    var r = h.row - Math.trunc((h.col + offset * (h.col & 1)) / 2);
    var s = -q - r;
    return Hex(q, r, s);
}

function roffset_from_cube(offset, h)
{
    var col = h.q + Math.trunc((h.r + offset * (h.r & 1)) / 2);
    var row = h.r;
    return OffsetCoord(col, row);
}

function roffset_to_cube(offset, h)
{
    var q = h.col - Math.trunc((h.row + offset * (h.row & 1)) / 2);
    var r = h.row;
    var s = -q - r;
    return Hex(q, r, s);
}

function Orientation(f0, f1, f2, f3, b0, b1, b2, b3, start_angle) {
    return {f0: f0, f1: f1, f2: f2, f3: f3, b0: b0, b1: b1, b2: b2, b3: b3, start_angle: start_angle};
}

function Layout(orientation, size, origin) {
    return {orientation: orientation, size: size, origin: origin};
}

var layout_pointy = Orientation(Math.sqrt(3.0), Math.sqrt(3.0) / 2.0, 0.0, 3.0 / 2.0, Math.sqrt(3.0) / 3.0, -1.0 / 3.0, 0.0, 2.0 / 3.0, 0.5);
var layout_flat = Orientation(3.0 / 2.0, 0.0, Math.sqrt(3.0) / 2.0, Math.sqrt(3.0), 2.0 / 3.0, 0.0, -1.0 / 3.0, Math.sqrt(3.0) / 3.0, 0.0);

function to_pixel(layout, h)
{
    var M = layout.orientation;
    var size = layout.size;
    var origin = layout.origin;
    var x = (M.f0 * h.q + M.f1 * h.r) * size.x;
    var y = (M.f2 * h.q + M.f3 * h.r) * size.y;
    return Point(x + origin.x, y + origin.y);
}

function pixel_to_hex(layout, p)
{
    var M = layout.orientation;
    var size = layout.size;
    var origin = layout.origin;
    var pt = Point((p.x - origin.x) / size.x, (p.y - origin.y) / size.y);
    var q = M.b0 * pt.x + M.b1 * pt.y;
    var r = M.b2 * pt.x + M.b3 * pt.y;
    return Hex(q, r, -q - r);
}

function corner_offset(layout, corner)
{
    var M = layout.orientation;
    var size = layout.size;
    var angle = 2.0 * Math.PI * (corner + M.start_angle) / 6;
    return Point(size.x * Math.cos(angle), size.y * Math.sin(angle));
}

function polygon_corners(layout, h)
{
    var corners = [];
    var center = to_pixel(layout, h);
    for (var i = 0; i < 6; i++)
    {
        var offset = corner_offset(layout, i);
        corners.push(Point(center.x + offset.x, center.y + offset.y));
    }
    return corners;
}


module.exports.Point = Point;

module.exports.Hex = Hex;
module.exports.add = add;
module.exports.subtract = subtract;
module.exports.scale = scale;
module.exports.directions = directions;
module.exports.direction = direction;
module.exports.neighbor = neighbor;
module.exports.diagonals = diagonals;
module.exports.diagonal_neighbor = diagonal_neighbor;
module.exports.length = length;
module.exports.distance = distance;
module.exports.round = round;
module.exports.lerp = lerp;
module.exports.linedraw = linedraw;

module.exports.OffsetCoord = OffsetCoord;
module.exports.EVEN = EVEN;
module.exports.ODD = ODD;
module.exports.qoffset_from_cube = qoffset_from_cube;
module.exports.qoffset_to_cube = qoffset_to_cube;
module.exports.roffset_from_cube = roffset_from_cube;
module.exports.roffset_to_cube = roffset_to_cube;

module.exports.Orientation = Orientation;

module.exports.Layout = Layout;
module.exports.layout_pointy = layout_pointy;
module.exports.layout_flat = layout_flat;
module.exports.to_pixel = to_pixel;
module.exports.pixel_to_hex = pixel_to_hex;
module.exports.corner_offset = corner_offset;
module.exports.polygon_corners = polygon_corners;