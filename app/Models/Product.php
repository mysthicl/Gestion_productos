<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class Product extends Model
{
    use HasFactory;

    protected $table = 'tbl_products'; 

    protected $fillable = [
        'nameProduct',
        'descriptionProduct',
        'priceProduct',
        'stockProduct',
    ];
}
