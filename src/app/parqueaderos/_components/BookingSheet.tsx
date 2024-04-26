'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'
import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
// TODO: Hacer bookigitem
// import CartItem from './CartItem'
import { useEffect, useState } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import PrimaryButton from '@/components/CustomButtons/PrimaryButton'

const BookingSheet = () => {
  return (
    // <Sheet>
    //   <SheetTrigger>
    //     <PrimaryButton text='RESERVAR PARQUEADERO' />
    //   </SheetTrigger>
    //   <SheetContent className='flex w-full flex-col pr-0 sm:max-w-lg'>
    //     <SheetHeader className='space-y-2.5 pr-6'>
    //       <SheetTitle className='tracking-widest'>RESERVA</SheetTitle>
    //       <Separator />
    //       <p className='text-gray-500 text-sm'>
    //         Para registrar tu reserva necesitamos los siguientes datos.
    //       </p>
    //       <Separator />
    //     </SheetHeader>
    //     <div className='flex w-full flex-col pr-6'>
    //       {/* <CartItem
    //                 selectionProduct={selectionProduct}
    //                 quantity={quantity}
    //                 key={
    //                   selectionProduct?.colorSelectedId +
    //                   selectionProduct?.product.id +
    //                   selectionProduct?.sizeSelected
    //                 }
    //               /> */}
    //     </div>

    //     <div className='space-y-4 pr-6'>
    //       <Separator />
    //       <div className='space-y-1.5 text-base'>
    //         <div className='flex'>
    //           <span className='flex-1'>Shipping</span>
    //           <span>34</span>
    //         </div>
    //         <div className='flex'>
    //           <span className='flex-1'>Transaction Fee</span>
    //           <span>43</span>
    //         </div>
    //         <div className='flex'>
    //           <span className='flex-1'>Total</span>
    //           <span>43</span>
    //         </div>
    //       </div>
    //       <Separator />
    //       <SheetFooter>
    //         <SheetTrigger asChild>
    //           <PrimaryButton text='RESERVAR PARQUEADERO'  />
    //         </SheetTrigger>
    //       </SheetFooter>
    //     </div>

    //     {/* ) : (
    //       <div className='flex h-full flex-col items-center justify-center space-y-1'>
    //         <p className='text-base tracking-widest'>YOUR CART IS EMPTY</p>
    //         <SheetTrigger asChild>
    //           <Link
    //             href='/products'
    //             className={buttonVariants({
    //               variant: 'link',
    //               size: 'sm',
    //               className: 'text-sm text-muted-foreground font-bold',
    //             })}
    //           >
    //             Add items to your cart checkout
    //           </Link>
    //         </SheetTrigger>
    //       </div>
    //     )} */}
    //   </SheetContent>
    // </Sheet>
    <Sheet>
      <SheetTrigger asChild className='w-full'>
        <PrimaryButton text='RESERVAR' />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when youre done.
          </SheetDescription>
        </SheetHeader>
        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='name' className='text-right'>
              Name
            </Label>
            <Input id='name' value='Pedro Duarte' className='col-span-3' />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='username' className='text-right'>
              Username
            </Label>
            <Input id='username' value='@peduarte' className='col-span-3' />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type='submit'>Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default BookingSheet
