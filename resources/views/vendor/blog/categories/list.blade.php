@extends('bases::layouts.master')
@section('content')
    @include('bases::elements.tables.datatables', ['title' => trans('blog::categories.list'), 'dataTable' => $dataTable])
@stop